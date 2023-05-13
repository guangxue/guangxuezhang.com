"use client";
import { uploadFile } from '@/utils/request';
import Image from 'next/image';
import React from 'react';

export default function ImageUploads() {
  const [file, setFile] = React.useState<File>();
  const [dataUrl, setDataUrl] = React.useState<string>();

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    setFile(file);
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      const fileDataStr = fileReader.result as string;
      setDataUrl(fileDataStr);
    }
    fileReader.onerror = (error) => {
      return error;
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) {
      return
    }
    return uploadFile(file.name, dataUrl as string)
  }

  return (
    <div className='ImageUploads basis-full flex flex-col gap-5'>
      <form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className="flex flex-col p-10 w-full gap-5">
        <div>
          <input type="file" accept='image/*' onChange={onFileChange} />
        </div>
        <div>
          <input type='submit' className='bg-sky-600  hover:bg-sky-700 px-4 py-2 text-zinc-100 rounded shadow-sm text-sm' value='Uploads' />
        </div>
      </form>
      {dataUrl && (
        <div className="flex gap-6 items-center p-6 border-t border-x-neutral-100">
          <div>
            <Image src={dataUrl} width={30} height={30} alt='upload image' style={{ width: '100px', height: '100px' }} />
          </div>
          <div>
            {file && (
              <div>
                <ul>
                  <li><span className='font-semibold'>Name: </span>{file.name}</li>
                  <li><span className='font-semibold'>Type: </span>{file.type}</li>
                  <li><span className='font-semibold'>Size: </span>{file.size / 1000} <span className="italic">Kbs</span></li>
                  <li><span className='font-semibold'>LastModified: </span>{file.lastModified}</li>
                </ul>
                <div>
                  {/* <button onClick={imageOptimize} className='bg-sky-600  hover:bg-sky-700 px-4 py-2 text-zinc-100 rounded shadow-sm text-sm'>Optimize</button> */}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
