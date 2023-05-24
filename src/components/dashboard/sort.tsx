import { faSort, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

const Sort = ({ order, elemOrder, index, orderUrl }) => {
  return (
    <>
      {elemOrder && (
        <Link
          key={index}
          href={
            order === elemOrder
              ? `${orderUrl}&order=-${elemOrder}`
              : `${orderUrl}&order=${elemOrder}`
          }
        >
          <a>
            {order === elemOrder && <FontAwesomeIcon icon={faSortUp} />}
            {order === `-${elemOrder}` && <FontAwesomeIcon icon={faSortDown} />}
            {order !== elemOrder && order !== `-${elemOrder}` && (
              <FontAwesomeIcon icon={faSort} />
            )}
          </a>
        </Link>
      )}
    </>
  );
};

export { Sort };
