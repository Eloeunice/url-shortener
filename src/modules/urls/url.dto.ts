export interface CreateUrlDto {
  destinationUrl: string;
  slug?: string | undefined;
}

export interface UpdateUrlDto {
  slug?: string | undefined;
  destinationUrl?: string | undefined;
  isActive?: boolean | undefined;
}
