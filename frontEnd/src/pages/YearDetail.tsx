import React from 'react'
import ByYear from '../components/ByYear';

export default function YearDetail() {
  const router = useRouter();
  const { year } = router.query;

  if (!year) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-6">Emails from {year}</h1>
      <ByYear year={year as string} />
    </div>
  );
}