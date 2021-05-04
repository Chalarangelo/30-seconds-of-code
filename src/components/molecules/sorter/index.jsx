import { useState, useRef } from 'react';
import PropTypes from 'typedefs/proptypes';
import Link from 'next/link';
import { combineClassNames } from 'utils';
import { useClickOutside } from 'components/hooks';

const propTypes = {
  sorter: PropTypes.sorter,
};

/**
 * Renders a sorter component.
 */
const Sorter = ({ sorter: { orders, selectedOrder } }) => {
  if (!orders || !orders.length || orders.length === 1) return null;

  const [toggled, setToggled] = useState(false);
  const sorterRef = useRef();

  const handleSorterClick = e => {
    if (!toggled || e.target.className.includes('selected')) {
      e.preventDefault();
      if (!toggled) setToggled(true);
      else setToggled(false);
    } else if (toggled) {
      setToggled(false);
    }
  };

  useClickOutside(sorterRef, () => {
    setToggled(false);
  });

  return (
    <div
      className={combineClassNames`sorter ${toggled ? 'open' : ''}`}
      ref={sorterRef}
    >
      <div className='sorter-inner srfc-04db'>
        {orders
          .sort((a, b) =>
            a.title === selectedOrder ? -1 : b.title === selectedOrder ? 1 : 0
          )
          .map(order => (
            <Link key={`${order.url}`} href={order.url}>
              <a
                className={combineClassNames`btn no-shd link-btn order-btn txt-100
                  ${
                    order.title === selectedOrder
                      ? `selected icon ${
                          toggled ? 'icon-chevron-up' : 'icon-chevron-down'
                        }`
                      : ''
                  }
                `}
                onClick={e => handleSorterClick(e)}
              >
                {order.title}
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
};

Sorter.propTypes = propTypes;

export default Sorter;
