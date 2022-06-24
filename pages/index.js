import Router, { useRouter } from 'next/router';
import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useQRCode } from 'react-hook-qrcode';

import axios from 'axios';

function go(id) {
  Router.push(`/api/profile/${id}`);
}

export default function Home(/*{ profiles }*/) {
  const [profiles, setProfiles] = useState([]);
  const router = useRouter();

  useEffect(() => {
    axios
      .get('api/profiles')
      .then((response) => setProfiles(response.data))
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  console.log(profiles);
  const headers = [
    { label: 'name', key: 'name' },
    { label: 'email', key: 'email' },
  ];

  const csvReport = {
    filename: 'Report.csv',
    headers: headers,
    data: profiles,
  };

  return (
    <>
      <h1 className='text-5xl text-blue-500'>Profiles List Preview</h1>
      <h2>asPath:- {router.asPath}</h2>
      {profiles.map((profile) => {
        const url = `${document.URL}/api/profile/${profile.id}`;
        return (
          <>
            <div className=' flex items-center justify-around gap-8 max-w-3xl bg-gray-800 m-10 p-4 rounded-lg'>
              <p key={profile.email}>
                {profile.name} : {profile.email}
              </p>
              <button onClick={() => router.push(url)}>go</button>

              <br />
              <br />
              <QRCodeSVG className='rounded' value={url} />
              <br />
            </div>
          </>
        );
      })}
      <br />
      <CSVLink
        className='p-4 text-sm w-40 ml-56 bg-green-500 flex items-center rounded font-bold uppercase  justify-center hover:bg-green-700 transition-colors'
        {...csvReport}
      >
        EXPORT CSV
      </CSVLink>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch('http://localhost:3000/api/profiles');
//   const profiles = await res.json();

//   return {
//     props: {
//       profiles,
//     },
//   };
// }
