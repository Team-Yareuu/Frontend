import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const FeaturedRecipes = () => {
  const navigate = useNavigate();

  const featuredRecipes = [
    {
      id: 1,
      title: "Nasi Gudeg Komplit",
      description: "Gudeg khas Yogyakarta dengan ayam kampung, telur, dan sambal krecek yang menggugah selera",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop",
      region: "Yogyakarta",
      cookingTime: "6 jam",
      difficulty: "Sulit",
      budget: "Rp 65.000",
      servings: 6,
      rating: 4.8,
      reviews: 234,
      tags: ["Tradisional", "Manis", "Khas Jogja"],
      isPopular: true
    },
    {
      id: 2,
      title: "Rendang Daging Sapi",
      description: "Rendang autentik Padang dengan bumbu rempah pilihan yang dimasak hingga empuk dan kering",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
      region: "Sumatera Barat",
      cookingTime: "8 jam",
      difficulty: "Menengah",
      budget: "Rp 85.000",
      servings: 8,
      rating: 4.9,
      reviews: 456,
      tags: ["Pedas", "Protein", "Minang"],
      isNew: true
    },
    {
      id: 3,
      title: "Soto Ayam Lamongan",
      description: "Soto ayam khas Lamongan dengan kuah bening yang segar dan topping lengkap",
      image: "https://images.pixabay.com/photo/2019/11/20/08/31/soup-4639743_1280.jpg?w=400&h=300&fit=crop",
      region: "Jawa Timur",
      cookingTime: "2 jam",
      difficulty: "Mudah",
      budget: "Rp 35.000",
      servings: 4,
      rating: 4.7,
      reviews: 189,
      tags: ["Berkuah", "Segar", "Praktis"],
      isBudgetFriendly: true
    },
    {
      id: 4,
      title: "Gado-Gado Jakarta",
      description: "Salad Indonesia dengan sayuran segar, tahu, tempe, dan bumbu kacang yang kaya rasa",
      image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?w=400&h=300&fit=crop",
      region: "DKI Jakarta",
      cookingTime: "45 menit",
      difficulty: "Mudah",
      budget: "Rp 25.000",
      servings: 4,
      rating: 4.6,
      reviews: 167,
      tags: ["Sehat", "Vegetarian", "Segar"],
      isHealthy: true
    },
    {
      id: 5,
      title: "Ayam Betutu Bali",
      description: "Ayam utuh yang dibumbui dengan base genep dan dibakar hingga empuk dan harum",
      image: "https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=400&h=300&fit=crop",
      region: "Bali",
      cookingTime: "5 jam",
      difficulty: "Sulit",
      budget: "Rp 75.000",
      servings: 6,
      rating: 4.8,
      reviews: 203,
      tags: ["Pedas", "Bakar", "Bali"],
      isSpicy: true
    },
    {
      id: 6,
      title: "Pempek Palembang",
      description: "Pempek ikan tenggiri asli Palembang dengan kuah cuko yang asam pedas menggugah selera",
      image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?w=400&h=300&fit=crop",
      region: "Sumatera Selatan",
      cookingTime: "3 jam",
      difficulty: "Menengah",
      budget: "Rp 45.000",
      servings: 8,
      rating: 4.7,
      reviews: 298,
      tags: ["Ikan", "Kenyal", "Asam Pedas"],
      isSignature: true
    }
  ];

  const handleRecipeClick = (recipe) => {
    navigate('/recipe-detail', { state: { recipeId: recipe?.id, recipe } });
  };

  const handleViewAll = () => {
    navigate('/ai-recipe-search');
  };

  const getBadgeInfo = (recipe) => {
    if (recipe?.isPopular) return { text: "Populer", color: "bg-accent text-white", icon: "TrendingUp" };
    if (recipe?.isNew) return { text: "Baru", color: "bg-success text-white", icon: "Sparkles" };
    if (recipe?.isBudgetFriendly) return { text: "Hemat", color: "bg-turmeric text-white", icon: "Wallet" };
    if (recipe?.isHealthy) return { text: "Sehat", color: "bg-pandan text-white", icon: "Heart" };
    if (recipe?.isSpicy) return { text: "Pedas", color: "bg-chili text-white", icon: "Flame" };
    if (recipe?.isSignature) return { text: "Khas", color: "bg-primary text-white", icon: "Award" };
    return null;
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Icon name="ChefHat" size={20} />
            <span className="text-sm font-medium uppercase tracking-wide">Resep Pilihan</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Resep Terpopuler Indonesia
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Koleksi resep autentik yang telah dipercaya ribuan keluarga Indonesia. 
            Dari yang tradisional hingga modern, semua dengan panduan AI yang mudah diikuti.
          </p>
        </div>

        {/* Recipe Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {featuredRecipes?.map((recipe) => {
            const badge = getBadgeInfo(recipe);
            
            return (
              <div
                key={recipe?.id}
                className="cultural-card cursor-pointer group"
                onClick={() => handleRecipeClick(recipe)}
              >
                {/* Recipe Image */}
                <div className="relative h-48 overflow-hidden rounded-t-lg">
                  <Image
                    src={recipe?.image}
                    alt={recipe?.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  {badge && (
                    <div className="absolute top-3 left-3">
                      <div className={`${badge?.color} px-2 py-1 rounded-full flex items-center space-x-1`}>
                        <Icon name={badge?.icon} size={12} />
                        <span className="text-xs font-medium">{badge?.text}</span>
                      </div>
                    </div>
                  )}

                  {/* Region */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Icon name="MapPin" size={12} className="text-primary" />
                      <span className="text-xs font-medium text-primary">{recipe?.region}</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-3 left-3">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center space-x-1">
                      <Icon name="Star" size={12} className="text-turmeric fill-current" />
                      <span className="text-xs font-medium text-foreground">{recipe?.rating}</span>
                      <span className="text-xs text-muted-foreground">({recipe?.reviews})</span>
                    </div>
                  </div>
                </div>
                {/* Recipe Info */}
                <div className="p-4 space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                      {recipe?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {recipe?.description}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1">
                    {recipe?.tags?.slice(0, 3)?.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Recipe Stats */}
                  <div className="grid grid-cols-4 gap-2 pt-3 border-t border-border text-center">
                    <div>
                      <Icon name="Clock" size={14} className="text-turmeric mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{recipe?.cookingTime}</p>
                    </div>
                    <div>
                      <Icon name="BarChart3" size={14} className="text-accent mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{recipe?.difficulty}</p>
                    </div>
                    <div>
                      <Icon name="Users" size={14} className="text-primary mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{recipe?.servings} porsi</p>
                    </div>
                    <div>
                      <Icon name="Wallet" size={14} className="text-success mx-auto mb-1" />
                      <p className="text-xs text-muted-foreground">{recipe?.budget}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button
            variant="outline"
            size="lg"
            onClick={handleViewAll}
            iconName="ArrowRight"
            iconPosition="right"
            className="bg-white shadow-cultural hover:shadow-cultural-lg"
          >
            Lihat Semua Resep
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedRecipes;