import React from 'react';
import { CKEditor } from 'ckeditor4-react';
const TabDescription = ({ description, setDescription }) => {
  const handleOnChangeDesciption = (event) => {
    setDescription(event.editor.getData());
  };
  return (
    <>
      <CKEditor
        config={{
          enterMode: 2,
          resize_minWidth: '100%',
          resize_maxHeight: 800,
          pasteFromWordRemoveStyles: false,
          pasteFromWordNumberedHeadingToList: true,
          pasteFromWordPromptCleanup: true,
        }}
        initData={description}
        onChange={handleOnChangeDesciption}
      />
    </>
  );
};

export default TabDescription;
