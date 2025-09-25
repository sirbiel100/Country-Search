import type { Metadata } from 'next'

type Props = {
  params: Promise<{name: string}>
}

export async function generateMetadata({ params }: Props) : Promise<Metadata> {
  const { name } = await params;

  const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
  const data = await res.json();

  const country = data[0];

  return {
    title: `GC | ${country?.name?.common ?? "Country Page"}`
  }
}

export const generateStaticParams = async () => {
    const req = await fetch("https://restcountries.com/v3.1/all?fields=name").then((res) => res.json());

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return req.map((country : any) => ({
        name: country.name.common
    }));
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <>
            {children}
        </>
    );
}