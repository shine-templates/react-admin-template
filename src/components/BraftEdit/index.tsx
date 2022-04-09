import React, { useState, useEffect } from 'react'
import 'braft-editor/dist/index.css'
import BraftEditor from 'braft-editor'
import { ContentUtils } from 'braft-utils'
import { Upload, Button, message } from 'antd'
import { PictureOutlined } from '@ant-design/icons'
import { EditorState, ControlType, ExtendControlType } from 'braft-editor/index'
import 'braft-extensions/dist/table.css'
import Table from 'braft-extensions/dist/table'
import { UploadProps } from 'antd/lib/upload'
import request from '@/assets/utils/request'
import { useDebounceFn } from 'ahooks'

const options = {
  defaultColumns: 3,
  defaultRows: 3,
  withDropdown: true,
  exportAttrString: '',
  columnResizable: false,
}

type P = {
  getHtmlChange: (html: string) => void
  initValue?: string
}

const controls: ControlType[] = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'table']

BraftEditor.use(Table(options))

const BraftEdit: React.FC<P> = ({ getHtmlChange, initValue }): JSX.Element => {
  const [content, setContent] = useState<EditorState>(BraftEditor.createEditorState(initValue))

  const { run } = useDebounceFn(
    html => {
      getHtmlChange(html)
    },
    { wait: 500 }
  )

  const handleChange = (editorState: EditorState) => {
    const html = editorState.toHTML() === '<p></p>' ? '' : editorState.toHTML()
    setContent(editorState)
    run(html)
  }

  const uploadFileInterface = data => {
    return request({
      url: '/base/file/upload/back',
      method: 'post',
      data,
      timeout: 0,
      prefix: '/shy/yanglao',
    })
  }

  const uploadHandler = (options: any) => {
    if (!options.file) {
      return false
    }

    const uploadFile = new FormData()
    uploadFile.append('files', options.file)
    uploadFile.append('fileType', '3')

    uploadFileInterface(uploadFile)
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setContent(
            ContentUtils.insertMedias(content, [
              {
                type: 'IMAGE',
                url: res.data[0].fileUrl,
              },
            ])
          )
        }
      })
      .catch(err => {
        message.error(err?.msg || '图片上传失败')
      })
  }

  const extendControls: ExtendControlType[] = [
    {
      key: 'antd-uploader',
      type: 'component',
      component: (
        <Upload<UploadProps>
          multiple={false}
          accept="image/*"
          name="files"
          action="/shy/yanglao/base/file/upload/back"
          data={{ fileType: '3' }}
          showUploadList={false}
          customRequest={uploadHandler}
        >
          <Button className="control-item button upload-button" icon={<PictureOutlined />}>
            插入图片
          </Button>
        </Upload>
      ),
    },
  ]

  return (
    <div className="editor-wrapper">
      <BraftEditor value={content} onChange={handleChange} controls={controls} extendControls={extendControls} />
    </div>
  )
}

export default BraftEdit
