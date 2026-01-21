export interface CreateDomainDTO {
  name: string;
  subdomain?: string;
}

export interface UpdateDomainDTO {
  name?: string;
  subdomain?: string;
  isActive?: boolean;
}
