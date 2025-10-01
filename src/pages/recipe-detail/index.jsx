import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import RecipeHeader from './components/RecipeHeader';
import CulturalStory from './components/CulturalStory';
import BudgetBreakdown from './components/BudgetBreakdown';
import IngredientsList from './components/IngredientsList';
import CookingSteps from './components/CookingSteps';
import NutritionInfo from './components/NutritionInfo';
import UserReviews from './components/UserReviews';
import AIAssistant from './components/AIAssistant';
import RelatedRecipes from './components/RelatedRecipes';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

import mockRecipeData from '../../data/mockRecipe.json';
import mockReviewsData from '../../data/mockReviews.json';
import mockRelatedRecipesData from '../../data/mockRelatedRecipes.json';

const RecipeDetail = () => {
  const { id: routeRecipeId } = useParams();
  const location = useLocation();
  const stateRecipe = location?.state?.recipe;
  const stateRecipeId = location?.state?.recipeId;
  const resolvedRecipeId = (() => {
    if (routeRecipeId) return routeRecipeId;
    if (stateRecipeId !== undefined && stateRecipeId !== null) return String(stateRecipeId);
    if (stateRecipe?.id !== undefined && stateRecipe?.id !== null) return String(stateRecipe?.id);
    return '1';
  })();

  const [recipe, setRecipe] = useState(null);
  const [servings, setServings] = useState(4);
  const [isSaved, setIsSaved] = useState(false);
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [activeTab, setActiveTab] = useState('ingredients');

  useEffect(() => {
    if (stateRecipe) {
      setRecipe({ ...stateRecipe, id: resolvedRecipeId });
      setServings(stateRecipe?.servings ?? 4);
      return;
    }
    const foundRecipe = mockRecipeData.find(
      (r) => String(r.id) === String(resolvedRecipeId)
    );
    if (foundRecipe) {
      setRecipe(foundRecipe);
      setServings(foundRecipe?.servings ?? 4);
    } else {
      // fallback kalau id ga ketemu → ambil resep pertama
      setRecipe(mockRecipeData[0]);
      setServings(mockRecipeData[0]?.servings ?? 4);
    }
  }, [stateRecipe, resolvedRecipeId]);

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: recipe?.name,
        text: recipe?.shortDescription,
        url: window.location?.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleServingsChange = (newServings) => {
    setServings(newServings);
  };

  const handleSubstitute = (ingredientIndex) => {
    // Handle ingredient substitution
    console.log('Substitute ingredient at index:', ingredientIndex);
  };

  const handleShopNow = (marketplace) => {
    // Handle shopping navigation
    console.log('Shop now at:', marketplace);
  };

  const handleAIHelp = (stepIndex) => {
    setShowAIAssistant(true);
  };

  const handleAddReview = () => {
    console.log('Add new review');
  };

  if (!recipe) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Icon name="Loader2" size={48} className="text-primary animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Memuat resep...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Recipe Header */}
          <RecipeHeader
            recipe={recipe}
            onSave={handleSave}
            onShare={handleShare}
            isSaved={isSaved}
          />

          {/* Main Content */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Cultural Story */}
              <CulturalStory story={recipe?.culturalStory} />

              {/* Tab Navigation */}
              <div className="bg-card rounded-xl border border-border overflow-hidden">
                <div className="flex border-b border-border">
                  {[
                    { id: 'ingredients', label: 'Bahan-Bahan', icon: 'List' },
                    { id: 'steps', label: 'Langkah Memasak', icon: 'ChefHat' },
                    { id: 'nutrition', label: 'Informasi Gizi', icon: 'Activity' }
                  ]?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${activeTab === tab?.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                    >
                      <Icon name={tab?.icon} size={16} />
                      <span className="hidden sm:inline">{tab?.label}</span>
                    </button>
                  ))}
                </div>

                <div className="p-0">
                  {activeTab === 'ingredients' && (
                    <IngredientsList
                      ingredients={recipe?.ingredients}
                      servings={servings}
                      onServingsChange={handleServingsChange}
                      onSubstitute={handleSubstitute}
                    />
                  )}

                  {activeTab === 'steps' && (
                    <CookingSteps
                      steps={recipe?.cookingSteps}
                      onAIHelp={handleAIHelp}
                    />
                  )}

                  {activeTab === 'nutrition' && (
                    <NutritionInfo
                      nutrition={recipe?.nutrition}
                      servings={servings}
                    />
                  )}
                </div>
              </div>

              {/* User Reviews */}
              <UserReviews
                reviews={mockReviewsData}
                onAddReview={handleAddReview}
              />
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Budget Breakdown */}
              <BudgetBreakdown
                budgetData={recipe?.budgetData}
                onShopNow={handleShopNow}
              />

              {/* Related Recipes */}
              <RelatedRecipes
                recipes={mockRelatedRecipesData}
                currentRecipeId={recipe?.id}
              />
            </div>
          </div>
        </div>
      </main>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <Button
          variant="default"
          size="lg"
          iconName="MessageCircle"
          iconPosition="left"
          onClick={() => setShowAIAssistant(true)}
          className="shadow-cultural-lg"
        >
          <span className="hidden sm:inline">Bantuan AI</span>
        </Button>
      </div>
      {/* AI Assistant */}
      <AIAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        recipe={recipe}
      />
    </div>
  );
};

export default RecipeDetail;
