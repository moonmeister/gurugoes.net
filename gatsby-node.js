exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {};

  const types = ['WpPost', 'WpPage']

  types.forEach((type) => {
    resolvers[type] = {
      cleanExcerpt: {
        type: 'String',
        resolve: source => {
          const excerpt = source?.excerpt ?? ""
          return excerpt.replace(/<[^>]*>?/gm, '').trim();
        }
      }
    };
  });

  createResolvers(resolvers);
};
