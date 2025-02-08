import DetailBanner from '@/components/DetailBanner';

interface Params {
  id: number;
  type: 'movie' | 'tv';
}

export default function DetailPage({ params }: { params: Params }) {
  return (
    <div>
      <DetailBanner id={params.id} type={params.type} />
    </div>
  );
}
