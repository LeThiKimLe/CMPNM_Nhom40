import React from 'react';
import { CKEditor } from 'ckeditor4-react';
const DescriptionTab = (props) => {
  const { description } = props;
  const handleOnChangeDesciption = (event) => {
    console.log(event.editor.getData());
    // setDescription(event.editor.getData());
  };
  return (
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
  );
};

export default DescriptionTab;
