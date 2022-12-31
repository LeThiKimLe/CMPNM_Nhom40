import React from 'react';

const DescriptionInfo = (props) => {
  const { description } = props;
  return (
    <>
      {description ? (
        <div
          style={{
            margin: '10px',
            overflow: 'scroll',
            display: 'block',
            maxHeight: '600px',
          }}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
      ) : null}
    </>
  );
};

export default DescriptionInfo;
