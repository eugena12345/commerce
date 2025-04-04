import styles from './SearchProducts.module.scss';
import Input from "../Input/Input";
import Button from "components/Button/Button";
import MultiDropdown from "../MultiDropdown/MultiDropdown";
import Text from "components/Text/Text";

interface SearchProductsProps {
    totalItems: number;
  }

const SearchProducts = ({totalItems}: SearchProductsProps) => {
    const handleChange = () => {
    }
    const getTitle = () => {
        return ''
    }
    return (
        <div className={styles.container}>
            <div className={styles['container__search']}>
                <Input placeholder="Search product" onChange={handleChange} value='' className={styles['container__search--grow']}/>
                <Button>Find now</Button>
            </div>
           
                <MultiDropdown options={[]} value={[]} onChange={handleChange} getTitle={getTitle} className={styles['container__filter']}/>
            
            <div className={styles['container__result']}>
                <Text tag='h2' color='primary'>Total products</Text>
                <Text view='p-20' color='accent' weight='bold'>{totalItems}</Text>
            </div>

        </div>
    );
}

export default SearchProducts;