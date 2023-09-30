import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Contact = ({ listing }) => {
  const [owner, setOwner] = useState(null);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    const fetchOwner = async () => {
      const res = await fetch(`/api/user/${listing?.userRef}`);
      if (!res.ok) {
        console.log(res?.data?.error);
        return;
      }
      const data = await res.json();
      setOwner(data);
    };

    fetchOwner();
  }, [listing?.userRef]);

  return (
    <section>
      {owner && (
        <div className='flex flex-col gap-2'>
          <p>
            Contact <span className='font-semibold'>{owner?.username} </span>
            for &nbsp;
            <span className='font-semibold'>{listing?.name.toLowerCase()}</span>
          </p>
          <textarea
            className='w-full border p-3 rounded-lg outline-none'
            placeholder='Enter your message'
            onChange={handleChange}
            value={message}
            name='message'
            id='message'
            rows='2'
          />
          <Link
            className='bg-slate-700 text-white text-center p-3 uppercase rounded-lg hover:opacity-95 mt-2'
            to={`mailto:${owner?.email}?subject=Regarding ${listing?.name}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      )}
    </section>
  );
};

export default Contact;
