import Head from "next/head";

type LayoutAuthProps = {
  title: string;
  children: React.ReactNode;
};

export default function LayoutAuth(props: LayoutAuthProps) {
  // props
  const { title, children } = props;

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>

      <main>{children}</main>
    </>
  );
}
