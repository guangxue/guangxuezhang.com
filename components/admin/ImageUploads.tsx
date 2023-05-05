import { uploadFile } from '@/utils/request';
import Image from 'next/image';
import React from 'react'

export default function ImageUploads() {
  const [file, setFile] = React.useState<File>();
  const [base64, setBase64] = React.useState<string>()

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
      setBase64(fileDataStr);
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
    uploadFile(file.name, base64 as string).then(res => {
      /**
       * return Response Object {
       *   type: "basic",
       *   url: "",
       *   redirect: false,
       *   status: 200,
       *   ok: true,
       *   statusText: "OK",
       *   headers: Headers, 
       * }
       */
      console.log("<request.ts><res>", res.ok);
    }).catch(err => {
      console.log("<request.ts><Erro>", err);
    })
  }

  return (
    <div className='ImageUploads basis-full flex flex-col gap-5'>
      <form onSubmit={handleSubmit} method='post' encType='multipart/form-data' className="flex flex-col border border-neutral-100 shadow-lg p-9 w-full gap-5">
        <div>
          <input type="file" accept='image/*' onChange={onFileChange} />
        </div>
        <div>
          <input type='submit' className='bg-sky-600  hover:bg-sky-700 px-4 py-2 text-zinc-100 rounded shadow-sm text-sm' value='Uploads' />
        </div>
      </form>
      {base64 && (
        <div className="border">
          <Image src={base64} width={30} height={30} alt='upload image' style={{ width: '80%', height: 'auto' }} />
        </div>
      )}
    </div>
  )
}
