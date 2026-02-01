export interface CreateDomainDTO {
  name: string;
  subdomain?: string | undefined;
}

export interface UpdateDomainDTO {
  name?: string | undefined;
  subdomain?: string | undefined;
  isActive?: boolean | undefined;
}
