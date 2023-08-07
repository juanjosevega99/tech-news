import Image from 'next/image';

import { PageLayout } from '../components/PageLayout';
import styles from '../styles/Home.module.css';

export default function Home({ articles }) {
  return (
    <PageLayout title='Tech News'>
      <div className={styles.container}>
        {articles.length === 0 && <h1>Not articles</h1>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <div key={index}>
              <Image
                alt={`Image for the article ${article.title}`}
                src={article.urlToImage}
                width={450}
                height={300}
                layout='responsive'
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </div>
          ))}
      </div>
    </PageLayout>
  );
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  try {
    const response = await fetch(
      // 'https://newsapi.org/v2/everything?q=tesla&from=2023-07-06&sortBy=publishedAt&apiKey=2f15ff4fb9594d90b6236d4711a1c0ea'
      'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=2f15ff4fb9594d90b6236d4711a1c0ea'
    );

    if (!response.ok) {
      throw new Error('Failed to fetch articles from API');
    }

    const { articles } = await response.json();
    return {
      props: {
        articles,
      },
    };
  } catch (error) {
    console.error('Error fetching articles:', error);
  }
}
