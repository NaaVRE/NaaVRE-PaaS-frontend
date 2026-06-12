export interface VLabLabel {
  title: string,
  color: string,
}

export interface VLab {
  title: string,
  slug: string,
  labels: Array<VLabLabel>,
  description: string,
  deployment_url: string,
  additional_actions: Array<{
    label: string;
    url: string;
    color: string;
  }>
  image: string | null,
}
