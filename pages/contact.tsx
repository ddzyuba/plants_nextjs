import { useState } from "react";
import { useForm } from "react-hook-form";
import type { NextPage } from 'next';
import Head from 'next/head';
import ServiceHero from '../components/Services/ServiceHero';
import styles from '../styles/Contact.module.css';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const Contact: NextPage = () => {
  const [status, setStatus] = useState(0);
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const onSubmit = handleSubmit(data => {
    fetch('http://localhost:1337/api/ezforms/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ formData: data }),
      cache: 'no-cache'
    })
      .then(data => {
        if (data.status === 200) {
          setStatus(200);
        }
      })
      .catch(error => {
        console.log("error", error);
      });

  });

  return (
    <div>
      <Head>
        <title>Contact Us</title>
        <meta name="description" content="Plants" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ServiceHero title='Contact Us' />
      <div className='side-padding'>
        <div className='container'>
          <div className={styles.wrapper}>
            <form onSubmit={onSubmit}>
              <div className={styles.lineWrapper}>
                <div className={styles.col1}>
                  <label htmlFor="firstName" className={styles.label}>First Name</label>
                  <input
                    type='text'
                    id='firstName'
                    className={styles.input}
                    {...register("firstName")}
                  />
                </div>
                <div className={styles.col2}>
                  <label htmlFor='lastName' className={styles.label}>Last Name</label>
                  <input
                    type='text'
                    id='lastName'
                    className={styles.input}
                    {...register("lastName")}
                  />
                </div>
              </div>
              <div className={styles.lineWrapper}>
                <div className={styles.col1}>
                  <label htmlFor='email' className={styles.label}>Email</label>
                  <input
                    type='email'
                    id="email"
                    className={styles.input}
                    {...register("email")}
                  />
                </div>
                <div className={styles.col2}>
                  <label htmlFor='phone' className={styles.label}>Phone Number</label>
                  <input
                    type='text'
                    id="phone"
                    className={styles.input}
                    {...register("phone")}
                  />
                </div>
              </div>
              <div className={styles.line}>
                <label htmlFor='subject' className={styles.label}>Subject</label>
                <input
                  type='text'
                  id="subject"
                  className={styles.input}
                  {...register("subject")}
                />
              </div>
              <div className={styles.line}>
                <label htmlFor='message' className={styles.label}>Message</label>
                <textarea
                  className={styles.textArea}
                  id="message"
                  {...register("message")}
                ></textarea>
              </div>
              <div className={styles.submitWrapper}>
                <input type="submit" className='cta-btn' value="Submit" />
              </div>
            </form>
            {status === 200 ?
              <div>Thank you for contacting us, we will get back to you soon!</div> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;