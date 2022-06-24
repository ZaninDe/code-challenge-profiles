// author: Gabriel Zanin
// techs: Nextjs, api dynamic routes, tailwindcss
/* future features:
            -single profile page rendered with more data
            -server api doployed serparatly, on railway.app for example
            -CRUD
*/
import { CSVLink } from 'react-csv';
import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { FacebookLogo, User, TwitterLogo } from 'phosphor-react';
import axios from 'axios';

export default function Home() {
  const [profiles, setProfiles] = useState([]);

  // fetch data api and set on profiles array
  useEffect(() => {
    axios
      .get('api/profiles')
      .then((response) => setProfiles(response.data))
      // if request does not complete
      .catch((rejected) => {
        console.log(rejected);
      });
  }, []);

  // split object to be exported
  const headers = [
    { label: 'name', key: 'name' },
    { label: 'email', key: 'email' },
    { label: 'facebook', key: 'facebook' },
    { label: 'twitter', key: 'twitter' },
  ];

  // set CSV to export
  const csvReport = {
    filename: 'Profiles.csv',
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
        // entire url for each profile route redirect
        const url = `${document.URL}/api/profile/${profile.id}`;
        return (
          <>
            <div className='bg-orange-500 min-w-[40vw] flex items-center justify-between m-8 p-4 rounded-xl'>
              <div className='flex flex-col'>
                <strong className='mb-4'>{profile.name}</strong>
                <div className='flex text-gray-700 items-center gap-2 ml-2'>
                  <User size={20} />
                  <p key={profile.email}>{profile.email}</p>
                </div>
                <div className='flex text-gray-700 items-center gap-2 ml-2'>
                  <FacebookLogo size={20} />
                  <p key={profile.email}>{profile.facebook}</p>
                </div>
                <div className='flex text-gray-700 items-center gap-2 ml-2'>
                  <TwitterLogo size={20} />
                  <p key={profile.email}>{profile.twitter}</p>
                </div>
              </div>
              <QRCodeSVG className='rounded' value={url} />
            </div>
          </>
        );
      })}
      <br />
    </main>
  );
}
