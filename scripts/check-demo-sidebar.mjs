import assert from 'node:assert/strict';
import path from 'node:path';

export async function checkDemoSidebar(page, frame, evidence, name) {
  const rows = frame.locator('.sidebar-session-row');
  assert.equal(await rows.count(), 2);
  const measurements = [];
  for (let index = 0; index < 2; index++) {
    const row = rows.nth(index);
    const title = row.locator('[role="treeitem"] > span[title]').first();
    const time = row.locator('.theme-sidebar-time');
    const measure = async state => {
      const geometry = await row.evaluate(node => {
        const rect = element => {
          const box = element.getBoundingClientRect();
          return { left: box.left, right: box.right, width: box.width };
        };
        const titleNode = node.querySelector('[role="treeitem"] > span[title]');
        const timeNode = node.querySelector('.theme-sidebar-time');
        return {
          title: rect(titleNode),
          time: rect(timeNode),
          actions: [...node.querySelectorAll('.theme-sidebar-row-action')].map(rect),
          opacity: getComputedStyle(timeNode).opacity,
          overflow: getComputedStyle(titleNode).overflowX,
          timeText: timeNode.textContent.trim(),
        };
      });
      assert.ok(geometry.title.width > 0, 'Session title lost its layout slot');
      assert.ok(
        geometry.title.right + 3 <= geometry.time.left,
        `${name}/${index}/${state}: session title overlaps timestamp: ${JSON.stringify(geometry)}`,
      );
      assert.ok(geometry.time.right <= geometry.actions[0].left, 'Time overlaps actions');
      assert.equal(geometry.overflow, 'hidden', 'Marquee must remain clipped');
      assert.equal(geometry.opacity, state === 'rest' ? '0' : '1');
      measurements.push({ index, state, ...geometry });
    };
    await page.mouse.move(0, 0);
    await page.waitForTimeout(180);
    await measure('rest');
    await title.hover();
    await page.waitForTimeout(250);
    await measure('hover');
    assert.ok(await time.getAttribute('title'), 'Timestamp has no full-time label');
    await page.screenshot({ path: path.join(evidence, `${name}-sidebar-${index}.png`) });
    await row.getByRole('treeitem').focus();
    await page.mouse.move(0, 0);
    await page.waitForTimeout(180);
    await measure('focus');
    await row.locator('.theme-sidebar-row-action').last().click();
    await frame.getByRole('menu').waitFor();
    await measure('menu');
    await page.keyboard.press('Escape');
    await row.getByRole('treeitem').evaluate(node => node.blur());
    await row
      .locator('.theme-sidebar-row-action')
      .last()
      .evaluate(node => node.blur());
  }
  return measurements;
}
