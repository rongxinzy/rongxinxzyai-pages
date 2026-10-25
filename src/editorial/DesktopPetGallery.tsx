import { useEffect, useState } from 'react';
import { FanGallery } from '../effects/fan-gallery';
import './desktop-pet-gallery.css';

const BLOG = '/blog/2026-10-24-desktop-pet-characters/';

const PETS = [
  { id: 'xiaoyuan', label: '小远·雪鸮' },
  { id: 'youli', label: '游栗·赤狐' },
  { id: 'tuantuan', label: '团团·海獭' },
  { id: 'mianmian', label: '绵绵·垂耳兔' },
  { id: 'zhuli', label: '竹栗·小熊猫' },
  { id: 'yunmo', label: '云墨·幼龙' },
  { id: 'maixiao', label: '麦小·柯基' },
] as const;

function useNarrowViewport() {
  const [narrow, setNarrow] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(max-width: 640px)').matches : false,
  );
  useEffect(() => {
    const query = window.matchMedia('(max-width: 640px)');
    const onChange = () => setNarrow(query.matches);
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);
  return narrow;
}

/** Chinese homepage only: fan gallery of seven desktop-pet idle sprites. */
export function DesktopPetGallery() {
  const narrow = useNarrowViewport();
  const items = PETS.map(({ id, label }) => ({
    src: `/desktop-pets/${id}.webp`,
    alt: label,
    href: BLOG,
  }));

  return (
    <div className="desktop-pet-gallery mx-auto mt-10 max-w-4xl md:mt-12">
      <FanGallery
        className="desktop-pet-fan"
        ariaLabel="七种桌面伙伴官方形象"
        items={items}
        cardWidth={narrow ? 132 : 162}
        aspectRatio={0.8}
        spacing={0.69}
        curve={0.14}
        tilt={14.5}
        lift={42}
        spread={0.2}
        stackFrom="left"
        speed={0.7}
        stagger={0.09}
        bounce={0.35}
        hoverSpeed={0.28}
        radius={18}
        entrance="stack"
        trigger="scroll"
        viewportStart={75}
        once
        showTitle={false}
      />
      <p className="mt-2 text-center text-[length:var(--fs-micro)] text-muted">
        <a href={BLOG} className="underline decoration-hairline underline-offset-2 hover:text-ink">
          桌面伙伴七种官方形象
        </a>
        {' · '}
        默认关闭，只读展示任务状态
      </p>
    </div>
  );
}
