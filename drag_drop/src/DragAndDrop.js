import React from 'react';

const DragAndDrop = props => {
  const { data, dispatch } = props;

  const handleDragEnter = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth + 1 })
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    // e.stopPropagation();

    dispatch({ type: 'SET_DROP_DEPTH', dropDepth: data.dropDepth - 1 });

    if (data.dropDepth > 0) return;

    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: false });
    e.dataTransfer.dropEffect = 'none';
  };
  
  const handleDragOver = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';

    dispatch({ type: 'SET_IN_DROP_ZONE', inDropZone: true });
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    // e.stopPropagation();

    const supportedFileTypes = ['image/jpeg', 'image/png'];
    let files = [...e.dataTransfer.files];

    if (files && files.length > 0) {
      const existingFiles = data.fileList.map((f) => f.name);
      files = files.filter((f) => !existingFiles.includes(f.name));

      let f = files[0];
      console.log(f);

      if (supportedFileTypes.indexOf(f.type) > -1) {
        const reader = new FileReader();
        reader.onload = (e) => {
          console.log('here');
          f.preview = e.target.result;
        }

        console.log('outside the if', f.preview);
        reader.readAsDataURL(f);
      }


      // files = files.map((f) => {
      //   if (supportedFileTypes.indexOf(f.type) > -1) {
      //     const reader = new FileReader();
      //     reader.onload = (e) => {
      //       console.log('here');
      //       f.preview = e.target.result;
      //     }
      //     reader.readAsDataURL(f);
      //   }
        
      //   return f;
      // })

      // console.log('files in handleDrop', files);
      dispatch({ type: 'ADD_FILE_TO_LIST', files });
      e.dataTransfer.clearData();

      dispatch({ type: 'SET_DROP_DEPTH', dropDepth: 0 });
      dispatch({ type: 'SET_IN_DROP_ZONE', InDropZone: false });
    }
  };

  // async function assignResult() {
  //   const reader = new FileReader();
  //   reader.onLoad = (el) => f.preview = el.target.result;
  //   reader.readAsDataURL(e.dataTransfer.files[0]);
  // }

  return (
    <div
      className={data.inDropZone ? 'drag-drop-zone inside-drag-area' : 'drag-drop-zone'}
      onDrop={e => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
      onDragEnter={(e) => handleDragEnter(e)}
      onDragLeave={(e) => handleDragLeave(e)}
    >
      <p>Drag Files here to upload</p>
    </div>
  );
};

export default DragAndDrop;
