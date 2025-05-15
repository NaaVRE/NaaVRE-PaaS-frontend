import VLabPage from "@/components/VLabPage";

type IProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function Page(props: IProps) {
  const { slug } = await props.params;
  return (
    <VLabPage slug={slug} />
  )
}
