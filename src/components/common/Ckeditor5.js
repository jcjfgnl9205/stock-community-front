import React, { useState, useEffect } from 'react';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { CKEditor } from '@ckeditor/ckeditor5-react'


const Ckeditor5 = (props) => {

  const [ editorLoaded, setEditorLoaded ] = useState(false);

  useEffect(() => {
    setEditorLoaded(true);
  }, []);

  
  return editorLoaded ? (
    <div className="App">
        <CKEditor
            editor={ Editor }
            // config={ editorConfiguration }
            data=""
            onReady={ editor => {
                // You can store the "editor" and use when it is needed.
                editor.setData(props.data?.content ? props.data.content : '');
            } }
            onChange={ ( event, editor ) => {
                props.onChange( editor );
                // console.log( { event, editor, data } );
            } }
            onBlur={ ( event, editor ) => {
                // console.log( 'Blur.', editor );
            } }
            onFocus={ ( event, editor ) => {
                // console.log( 'Focus.', editor );
            } }
        />
    </div>
  ) : <div>Loading</div>;
}

export default React.memo(Ckeditor5);
