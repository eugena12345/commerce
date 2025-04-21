import { observer, useLocalStore } from "mobx-react-lite";
import { useEffect } from "react";
import CategoryStore from "store/CategoryStore";
import styles from './CategoryPage.module.scss';
import Text from "components/Text";
import { routes } from "config/routes.config";
import { useNavigate } from "react-router";

const CategoryPage = observer(() => {
    const categoryStore = useLocalStore(() => new CategoryStore());
    const navigate = useNavigate()
    useEffect(() => {
        categoryStore.getCategories()
    }, [categoryStore]);

    return (
        <div className={styles.categories}>
            <div className={styles['categories--maxwidth']}>
                <Text view='title'>Categories</Text>
                <div className={styles.categoryblock}>
                    {categoryStore.items.map((category) => <div className={styles.category}
                        onClick={() => navigate(routes.productsWithCategory.create(category.id))} >
                        <img src={category.image.url} />
                        <Text tag="h2" color="accent">{category.title}</Text>
                    </div>)}
                </div>

            </div>

        </div>
    )
});

export default CategoryPage;