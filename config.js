var config = {};

config.database = {
  clear: true,
  dialect: 'mysql',
  name: 'nx3mc5eg',
  host: 'db4free.net',
  password: 'testadmin',
  username: 'aghsb2k',
}

config.excel = {
  fileName: 'data.xlsx'
}

config.enums = {
  defenses: ['PL Defense','Adminstrative defense', 'Coverage', 'CD',
    'Cyber', 'Property', 'Casualty', 'Surety', 'Fidelity',
    'Subrogation','Sex Abuse','Strategic', ],
  departments: ['F&S', 'P&C','PL'],
  rateTypes: ['Senior Partner','Partner','Associate',
    'Paralegal','Flat Fee'],
  states: ['AL','AK','AZ','AR','CA','CO','CT','DC','DE',
    'FL','GA','HI','ID','IL','IN','IA','KS','KY',
    'LA','ME','MD','MA','MI','MN','MS','MO','MT',
    'NE','NV','NH','NJ','NM','NY','NC','ND','OH',
    'OK','OR','PA','RI','SC','SD','TN','TX','UT',
    'VT','VA','WA','WV','WI','WY','National'],
  statuses: ['Active', 'Probationary'],
  vendors: ['Attorney','Adjuster','Expert'],
  userTypes: ['Administration', 'Claims']
}

config.web = {
  host: 'localhost',
  port: process.env.WEB_PORT || 8080,
  secret: 'counsel'
}
//The values in the excel file that map to the model
config.keys = {
  address: 'Concatenated Address fields',
  city: 'City',
  dateStatusChanged: 'null',
  department: 'Department',
  email: 'Email',
  extension: 'null',
  firmName: 'Firm Name',
  keyContact: 'Key Contact',
  name: 'Attorney Name',
  notes: 'Notes',
  phone:'Phone',
  rateApprovalDate: 'Rate Approval Date',
  rateChangedBy:'null',
  state: 'State',
  stateRepresented: ' State',
  status: 'Status',
  statusChangedBy: 'null',
  typeOfDefense: 'null',
  vendorNumber: 'Vendor No',
  zip: 'Zip',
  zipPlusFour: 'null'
}

currentUser = null;


module.exports = config;