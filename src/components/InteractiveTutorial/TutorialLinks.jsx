import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@mui/material';
import InfoCard from '../Common/InfoCard/InfoCard';
import { Filter, SlidersHorizontal, ScanText, VectorSquare, Grip, SearchCode, Network } from 'lucide-react';

const TUTORIAL_SECTIONS = {
  vectorSearch: {
    title: 'Vektör Arama',
    tutorials: [
      {
        icon: Filter,
        title: 'Filtreleme - Başlangıç',
        description: 'Temel yük koşullarını kullanarak arama sonuçlarını filtreleyin.',
        href: '/tutorial/filteringbeginner',
      },
      {
        icon: SlidersHorizontal,
        title: 'Filtreleme - İleri',
        description: 'İç içe yük koşullarına dayalı gelişmiş filtrelemeyi deneyin.',
        href: '/tutorial/filteringadvanced',
      },
      {
        icon: ScanText,
        title: 'Filtreleme - Tam Metin',
        description: 'Metin alanlarında alt dizeler, belirteçler veya ifadeler arayın.',
        href: '/tutorial/filteringfulltext',
      },
      {
        icon: VectorSquare,
        title: 'Çoklu Vektör Arama',
        description: 'ColBERT çoklu vektörleriyle temsil edilen verilerle çalışın.',
        href: '/tutorial/multivectors',
      },
      {
        icon: Grip,
        title: 'Seyrek Vektör Arama',
        description: 'Belirli arama sonuçları elde etmek için seyrek vektörleri kullanın.',
        href: '/tutorial/sparsevectors',
      },
      {
        icon: SearchCode,
        title: 'Hibrit Arama',
        description: 'Daha doğru arama sonuçları için yoğun ve seyrek vektörleri birleştirin.',
        href: '/tutorial/hybridsearch',
      },
    ],
  },
  multitenancy: {
    title: 'Kurulum Kılavuzu',
    tutorials: [
      {
        icon: Network,
        title: 'Çok Kiracılı',
        description: 'Tek bir koleksiyonda birden çok kullanıcıyı yönetin.',
        href: '/tutorial/multitenancy',
      },
    ],
  },
};

const TutorialLinks = ({ sections = ['filtering', 'vectorSearch', 'multitenancy'], showTitle = true }) => {
  const allTutorials = sections.reduce((acc, sectionKey) => {
    const section = TUTORIAL_SECTIONS[sectionKey];
    if (section) {
      return [...acc, ...section.tutorials];
    }
    return acc;
  }, []);

  if (showTitle) {
    return (
      <>
        {sections.map((sectionKey) => {
          const section = TUTORIAL_SECTIONS[sectionKey];
          if (!section) return null;

          return (
            <Box key={sectionKey} component="section">
              <Typography component="h2" variant="h6" mb="1rem">
                {section.title}
              </Typography>
              <Grid container spacing={2} sx={{ '& > .MuiGrid-root': { display: 'flex' } }}>
                {section.tutorials.map((tutorial) => (
                  <Grid key={tutorial.href} size={{ xs: 12, md: 6, lg: 3 }}>
                    <InfoCard
                      icon={tutorial.icon}
                      iconVariant="top"
                      title={tutorial.title}
                      description={tutorial.description}
                      href={tutorial.href}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          );
        })}
      </>
    );
  }

  return (
    <Grid container spacing={2} sx={{ '& > .MuiGrid-root': { display: 'flex' } }}>
      {allTutorials.map((tutorial) => (
        <Grid key={tutorial.href} size={{ xs: 12, md: 6, lg: 3 }}>
          <InfoCard
            icon={tutorial.icon}
            iconVariant="top"
            title={tutorial.title}
            description={tutorial.description}
            href={tutorial.href}
          />
        </Grid>
      ))}
    </Grid>
  );
};

TutorialLinks.propTypes = {
  sections: PropTypes.arrayOf(PropTypes.string),
  showTitle: PropTypes.bool,
};

export default TutorialLinks;
