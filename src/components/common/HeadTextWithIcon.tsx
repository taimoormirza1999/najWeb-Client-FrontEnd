import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

export default function HeadTextWithIcon(props) {
  const { icon, header, tagline, gicon } = props;

  return (
    <>
      <div className="group flex cursor-default items-center my-8 pl-1 pr-0  text-3xl font-semibold text-[#013188] hover:border-inherit">
        {/* <h4 className="text-dark-blue inline flex-1 text-2xl font-semibold md:text-3xl"> */}
        {icon && (
          <FontAwesomeIcon
            icon={icon}
            className="text-3xl text-[#013188] ltr:mr-2 rtl:ml-2"
          />
        )}
        {gicon && (
          <i
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="material-icons text-3xl ltr:mr-2 rtl:ml-2 "
            dangerouslySetInnerHTML={{ __html: gicon }}
          ></i>
        )}

        <FormattedMessage id={header} />
        {/* </h4> */}
      </div>
      {tagline && (
        <p className="text-dark-blue mb-8 text-left text-xl lg:text-2xl">
          <FormattedMessage id={tagline} />
        </p>
      )}
    </>
  );
}
