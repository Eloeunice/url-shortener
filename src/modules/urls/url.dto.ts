export interface CreateUrlDto {
  destinationUrl: string;
  slug?: string;
}

export interface UpdateUrlDto {
  slug?: string;
  destinationUrl?: string;
  isActive?: boolean;
}
