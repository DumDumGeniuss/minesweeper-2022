import type {
  NextPage,
  GetStaticProps,
  // GetServerSideProps,
} from 'next';
import { useTranslation, Trans } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSelector, useDispatch } from 'react-redux';
import { getInitialLocale } from '@/utils/i18n';
import { AppState, wrapper } from '@/stores';
import { setMockup, fetchMockup } from '@/stores/mockup';

const Home: NextPage = function Home() {
  const { t, i18n } = useTranslation();
  const {
    mockup: { mockup },
  } = useSelector<AppState, AppState>((state) => state);
  const dispatch = useDispatch();
  dispatch(setMockup('New Shohei Ohtani'));

  return (
    <main>
      <section className="m-5 p-5 border-2 rounded-xl">
        <p className="text-xl font-bold">
          <Trans
            ns="index"
            i18nKey="default.language.is"
            values={{ language: `"${i18n.language}"` }}
            components={{ 1: <strong /> }}
          />
        </p>
        <p>{t('greetings', { ns: 'index' })}</p>
        <p>{mockup}</p>
      </section>
    </main>
  );
};

export const getStaticProps: GetStaticProps = wrapper.getStaticProps(
  (store) =>
    async ({ locale }) => {
      store.dispatch(fetchMockup('Shohei Ohtani'));

      return {
        props: {
          ...(await serverSideTranslations(getInitialLocale(locale), [
            'index',
          ])),
        },
      };
    }
);

export default Home;
