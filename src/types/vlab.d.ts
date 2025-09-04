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
  image: string | null,
}
