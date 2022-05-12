import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <i className="material-icons bg-teal-blue text-light-grey p-1 text-2xl lg:mr-2">
      &#xe5cb;
    </i>
  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next ml-2"
    onClick={onClick}
    disabled={!enabled}
  >
    <i className="material-icons bg-teal-blue text-light-grey p-1 text-2xl lg:mr-2">
      &#xe5cc;
    </i>
  </button>
);

const AnnouncementsCarousel = ({ children }) => {
  const autoplay = useRef(
    Autoplay(
      { delay: 5000, stopOnInteraction: false },
      (emblaRoot) => emblaRoot.parentElement
    )
  );

  const [viewportRef, embla] = useEmblaCarousel(
    {
      skipSnaps: false,
      loop: true,
    },
    [autoplay.current]
  );
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    embla.on('select', onSelect);
  }, [embla, onSelect]);

  return (
    <>
      <div className="embla relative">
        <div className="embla__viewport" ref={viewportRef}>
          <div className="embla__container"> {children} </div>
        </div>
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 xl:left-auto xl:right-4 xl:translate-x-0">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>
    </>
  );
};

export default AnnouncementsCarousel;
