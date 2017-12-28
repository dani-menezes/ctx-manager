import { Company } from 'app/companies/company/company.model'

export interface Context {
    // dependencies
    company: Company
    // attributes
    id: any
    colorBg: string
    colorMn: string
    colorFn: string
    minX: string
    maxX: string
    minY: string
    maxY: string
    name: string
}
/*

private List<BaseLayer> baseLayers;
private List<Plugin> plugins;
private List<External> externals;
private List<FolderOrder> folders;
private List<Project> projects;

*/