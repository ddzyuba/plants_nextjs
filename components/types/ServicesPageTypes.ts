import { ServiceListData } from './ServiceListTypes';
import { WhyChooseUsData } from './WhyChooseUsTypes';
import { WorkingProcessData } from './WorkingProcessTypes';
import { StaffData } from './StaffTypes';

export type ServicesPageProps = {
  serviceListData: ServiceListData;
  whyChooseUsData: WhyChooseUsData;
  workingProcessData: WorkingProcessData;
  staffData: StaffData;
}