import { GameSetting } from "@/features/game";
import { ContentLayout } from "@/components/layouts";

export const GameSetup = () => {
  return (
    <ContentLayout title="Blindfold Chess">
      <GameSetting />
    </ContentLayout>
  );
};
