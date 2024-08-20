/* eslint-disable @next/next/no-img-element */
'use client';

import { ImageData } from '@/types/gallery';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaArrowLeftLong } from 'react-icons/fa6';

const GalleryView = () => {
  const [imageList, setImageList] = useState<ImageData[]>([]);

  const handleGetImageList = async () => {
    try {
      const res = await axios.get('https://picsum.photos/v2/list');
      console.log(res.data);
      if (res.data.length) {
        setImageList(res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetImageList();
  }, []);

  return (
    <main
      style={{
        backgroundColor: 'lightgray',
        minHeight: '100dvh',
        padding: '4rem 4%'
      }}
    >
      <Link
        href='/'
        style={{
          position: 'absolute',
          left: '4rem',
          top: '1.5rem',
          display: 'flex',
          height: '2.5rem',
          alignItems: 'center',
          fontSize: '2.25rem'
        }}
      >
        <FaArrowLeftLong />
      </Link>

      <section
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '4px',
          overflow: 'hidden'
        }}
      >
        {imageList.map(image => (
          <img
            key={image.id}
            src={image.download_url}
            alt={image.author}
            loading='lazy'
            style={{ height: '150px' }}
          />
        ))}
      </section>
    </main>
  );
};

export default GalleryView;
