import { useState, useEffect, useCallback } from 'react';
import { supabase, Pet } from '../lib/supabase';
import { clamp, determineStage, calculateDecay } from '../utils/helpers';
import { ACTION_EFFECTS } from '../utils/constants';

export const usePetState = () => {
  const [pet, setPet] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);

  const loadPet = useCallback(async () => {
    try {
      const { data: pets } = await supabase
        .from('pets')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (pets && pets.length > 0) {
        const loadedPet = pets[0] as Pet;
        const decay = calculateDecay(loadedPet.last_decay_at);

        const updatedPet = {
          ...loadedPet,
          hunger: clamp(loadedPet.hunger - decay.hunger, 0, 100),
          energy: clamp(loadedPet.energy - decay.energy, 0, 100),
          happiness: clamp(loadedPet.happiness - decay.happiness, 0, 100),
          last_decay_at: new Date().toISOString(),
        };

        await supabase
          .from('pets')
          .update({
            hunger: updatedPet.hunger,
            energy: updatedPet.energy,
            happiness: updatedPet.happiness,
            last_decay_at: updatedPet.last_decay_at,
          })
          .eq('id', updatedPet.id);

        setPet(updatedPet);
      } else {
        const { data: newPet } = await supabase
          .from('pets')
          .insert({
            name: 'My Pet',
            stage: 'egg',
          })
          .select()
          .single();

        setPet(newPet as Pet);
      }
    } catch (error) {
      console.error('Error loading pet:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadPet();
  }, [loadPet]);

  const updatePetStats = useCallback(async (updates: Partial<Pet>) => {
    if (!pet) return;

    const updatedPet = { ...pet, ...updates };
    setPet(updatedPet);

    await supabase
      .from('pets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', pet.id);
  }, [pet]);

  const performAction = useCallback(async (action: 'feed' | 'play' | 'rest') => {
    if (!pet) return;

    const effects = ACTION_EFFECTS[action];
    const now = new Date().toISOString();

    const updates: Partial<Pet> = {
      hunger: clamp((pet.hunger + (effects.hunger || 0)), 0, 100),
      energy: clamp((pet.energy + (effects.energy || 0)), 0, 100),
      happiness: clamp((pet.happiness + (effects.happiness || 0)), 0, 100),
      bond: clamp((pet.bond + (effects.bond || 0)), 0, 100),
      experience: pet.experience + effects.experience,
    };

    if (action === 'feed') updates.last_fed_at = now;
    if (action === 'play') updates.last_played_at = now;
    if (action === 'rest') updates.last_rested_at = now;

    const newStage = determineStage(updates.experience!);
    if (newStage !== pet.stage) {
      updates.stage = newStage;
    }

    await updatePetStats(updates);
  }, [pet, updatePetStats]);

  return {
    pet,
    loading,
    updatePetStats,
    performAction,
    refreshPet: loadPet,
  };
};
