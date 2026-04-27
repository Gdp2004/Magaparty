import React from 'react';
import { Navbar } from '@/components/Navbar/Navbar';
import { Hero } from '@/components/Hero/Hero';
import { Beach } from '@/components/Beach/Beach';
import { Restaurant } from '@/components/Restaurant/Restaurant';
import { Events } from '@/components/Events/Events';
import { Gallery } from '@/components/Gallery/Gallery';
import { Booking } from '@/components/Booking/Booking';
import { Info } from '@/components/Info/Info';
import { Footer } from '@/components/Footer/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Beach />
        <Restaurant />
        <Events />
        <Gallery />
        <Booking />
        <Info />
      </main>
      <Footer />
    </>
  );
}
