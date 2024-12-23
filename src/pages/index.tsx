// src/pages/index.js
import Head from 'next/head';
import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from '@clerk/nextjs';
import ResumeForm from '../forms/ResumeForm';
import DomainPage from './domain';
import { useEffect, useState } from 'react';

function Header() {
  return (
    <header className="w-full py-4 bg-blue-600 text-white flex justify-between items-center px-8 sticky top-0 z-10 shadow-md">
      <div className="text-2xl font-bold">E-Resume</div>
      <div className="flex items-center space-x-4 sm:space-x-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </header>
  );
}

function HomePage() {
  const { user, isLoaded } = useUser();
  const [step2Completed, setStep2Completed] = useState(false);

  useEffect(() => {
    const checkUserInDatabase = async () => {
      if (isLoaded && user) {
        console.log('index user:', user);

        try {
          const response = await fetch(`http://localhost:5000/user/${user.id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const userData = await response.json();
            console.log('User data from backend:', userData);
            setStep2Completed(userData.filledForm);
          } else {
            console.error('Failed to fetch user data:', response.status);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      } else {
        console.log('User is not loaded yet or is undefined', { isLoaded, user });
      }
    };

    checkUserInDatabase();
  }, [isLoaded, user]);

  return (
    <div>
      <Head>
        <title>E-Resume: Home</title>
        <meta name="description" content="Single Page Resume Builder" />
        <link rel="icon" type="image/png" href="/icons/resume-icon.png" />
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-8 px-4 sm:px-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 text-center">
          Welcome to E-Resume
        </h1>
        <p className="mt-4 text-sm sm:text-base md:text-lg text-gray-600 text-center">
          Build your professional resume effortlessly!
        </p>

        <div className="mt-8 w-full max-w-4xl">
          <SignedIn>
            {/* Conditionally render DomainPage or ResumeForm */}
            {step2Completed ? <DomainPage /> : <ResumeForm />}
          </SignedIn>

          <SignedOut>
            <SignInButton mode="modal">
              <button className="px-6 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 w-full sm:w-auto">
                Sign In to Get Started
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </main>
    </div>
  );
}

export default HomePage;
