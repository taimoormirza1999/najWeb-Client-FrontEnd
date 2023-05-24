import {
  faSort,
  faSortDown,
  faSortUp,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';

const Sort = ({ order, elemOrder, index }) => {
  const router = useRouter();

  const sortOnClick = () => {
    const { pathname, query } = router;
    query.order = order === elemOrder ? `-${elemOrder}` : elemOrder;

    router.push({
      pathname,
      query,
    });
  };

  return (
    <>
      {elemOrder && (
        <div
          className="block cursor-pointer px-2"
          onClick={sortOnClick}
          key={index}
        >
          {order === elemOrder && <FontAwesomeIcon icon={faSortUp} />}
          {order === `-${elemOrder}` && <FontAwesomeIcon icon={faSortDown} />}
          {order !== elemOrder && order !== `-${elemOrder}` && (
            <FontAwesomeIcon icon={faSort} />
          )}
        </div>
      )}
    </>
  );
};

export { Sort };
