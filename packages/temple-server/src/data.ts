import HashStore from '@blanquera/types/dist/HashStore';
//we need to do it like this so different
//files can use the same instance
const data = new HashStore();
export default data;