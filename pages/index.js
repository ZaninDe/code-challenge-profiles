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
    <main className='flex flex-col items-center justify-center  w-full'>
      <h1 className='text-5xl text-orange-500 p-6'>Profiles List Preview</h1>
      <CSVLink
        className='p-4 text-sm w-40 my-10 bg-green-500 flex items-center rounded font-bold uppercase  justify-center hover:bg-green-700 transition-colors'
        {...csvReport}
      >
        EXPORT CSV
      </CSVLink>
      {profiles.map((profile) => {
        const url = `${document.URL}/api/profile/${profile.id}`;
        return (
          <>
            <div className='bg-orange-500 min-w-[40vw] flex items-center justify-between m-8 p-4 rounded-xl'>
              <p key={profile.email}>
                {profile.name} : {profile.email}
              </p>
              <QRCodeSVG className='rounded' value={url} />
            </div>
          </>
        );
      })}
      <br />
    </main>
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
