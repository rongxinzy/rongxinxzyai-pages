import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const roadmapPath = resolve(projectRoot, "data/roadmap/desktop.json");

const URL_PATTERN =
  /^https:\/\/github\.com\/rongxinzy\/RongxinAI\/(?:pull|issues)\/[1-9]\d*$/;
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const ID_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function fail(message) {
  throw new Error(`data/roadmap/desktop.json: ${message}`);
}

function assertString(value, label) {
  if (typeof value !== "string" || value.trim() === "") fail(`${label} must be a non-empty string`);
}

const retiredCodename = String.fromCharCode(109, 97, 103, 112, 105, 101);

function assertNoRetiredCodename(value, label) {
  if (typeof value === "string" && value.toLowerCase().includes(retiredCodename)) {
    fail(`${label} contains a retired internal name`);
  }
}

function assertDate(value, label) {
  assertString(value, label);
  const match = DATE_PATTERN.exec(value);
  if (!match) fail(`${label} must be YYYY-MM-DD`);
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    fail(`${label} is not a real calendar date`);
  }
}

export function validateRoadmap(data) {
  if (typeof data !== "object" || data === null || Array.isArray(data)) {
    fail("root must be an object");
  }
  const allowedRoot = new Set(["milestones"]);
  for (const key of Object.keys(data)) {
    if (!allowedRoot.has(key)) fail(`unknown field "${key}"`);
  }
  if (!Array.isArray(data.milestones) || data.milestones.length === 0) {
    fail("milestones must be a non-empty array");
  }

  const ids = new Set();
  for (const [milestoneIndex, milestone] of data.milestones.entries()) {
    const where = `milestones[${milestoneIndex}]`;
    if (typeof milestone !== "object" || milestone === null || Array.isArray(milestone)) {
      fail(`${where} must be an object`);
    }
    const allowedMilestone = new Set(["id", "title", "titleEn", "items"]);
    for (const key of Object.keys(milestone)) {
      if (!allowedMilestone.has(key)) fail(`${where} has unknown field "${key}"`);
    }
    assertString(milestone.id, `${where}.id`);
    if (!ID_PATTERN.test(milestone.id)) {
      fail(`${where}.id must be a lowercase slug`);
    }
    if (ids.has(milestone.id)) fail(`duplicate milestone id "${milestone.id}"`);
    ids.add(milestone.id);
    assertString(milestone.title, `${where}.title`);
    assertNoRetiredCodename(milestone.title, `${where}.title`);
    if (milestone.titleEn !== undefined) {
      assertString(milestone.titleEn, `${where}.titleEn`);
      assertNoRetiredCodename(milestone.titleEn, `${where}.titleEn`);
    }
    if (!Array.isArray(milestone.items) || milestone.items.length === 0) {
      fail(`${where}.items must be a non-empty array`);
    }

    for (const [itemIndex, item] of milestone.items.entries()) {
      const itemWhere = `${where}.items[${itemIndex}]`;
      if (typeof item !== "object" || item === null || Array.isArray(item)) {
        fail(`${itemWhere} must be an object`);
      }
      const allowedItem = new Set(["date", "text", "textEn", "url", "done"]);
      for (const key of Object.keys(item)) {
        if (!allowedItem.has(key)) fail(`${itemWhere} has unknown field "${key}"`);
      }
      assertDate(item.date, `${itemWhere}.date`);
      assertString(item.text, `${itemWhere}.text`);
      assertNoRetiredCodename(item.text, `${itemWhere}.text`);
      if (item.textEn !== undefined) {
        assertString(item.textEn, `${itemWhere}.textEn`);
        assertNoRetiredCodename(item.textEn, `${itemWhere}.textEn`);
      }
      assertString(item.url, `${itemWhere}.url`);
      if (!URL_PATTERN.test(item.url)) {
        fail(`${itemWhere}.url must be a pull request or issue in rongxinzy/RongxinAI`);
      }
      if (typeof item.done !== "boolean") fail(`${itemWhere}.done must be a boolean`);
    }
  }

  return data;
}

export async function loadRoadmap() {
  const raw = await readFile(roadmapPath, "utf8");
  let data;
  try {
    data = JSON.parse(raw);
  } catch (error) {
    fail(error instanceof Error ? error.message : "invalid JSON");
  }
  return validateRoadmap(data);
}

const isDirectRun = process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirectRun) {
  await loadRoadmap();
}
