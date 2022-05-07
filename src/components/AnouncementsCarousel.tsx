import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';

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
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <i className="material-icons bg-teal-blue text-light-grey p-1 text-2xl lg:mr-2">
      &#xe5cc;
    </i>
  </button>
);

const AnouncementsCarousel = ({ slides }) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });
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
          <div className="embla__container">
            {slides.map((item, index) => (
              <div className="embla__slide" key={index}>
                <div className="embla__slide__inner">{item}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute right-0 bottom-2">
          <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
          <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
        </div>
      </div>
    </>
  );
};

export default AnouncementsCarousel;
