<?php

namespace App\Controller;

use App\Entity\Activity;
use App\Entity\Trip;
use DateTimeInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;

#[Route('/api', name: 'api_')]
class ActivityController extends AbstractController
{
    #[Route('/activities', name: 'activity_index', methods: ['GET'])]
    public function index(EntityManagerInterface $entityManager): JsonResponse
    {
        $activities = $entityManager->getRepository(Activity::class)->findAll();

        $data = [];

        foreach ($activities as $activity) {
            $data[] = [
                'id' => $activity->getId(),
                'dayOne' => $activity->getDay1(),
                'dayTwo' => $activity->getDay2(),
                'dayThree' => $activity->getDay3(),
                'dayFour' => $activity->getDay4(),
                'dayFive' => $activity->getDay5(),
            ];
        }

        return $this->json($data);
    }

    #[Route('/activities', name: 'create_activity', methods: ['POST'])]
    public function create(EntityManagerInterface $entityManager, Request $request): JsonResponse
    {
        $content = $request->getContent();
        $data = json_decode($content, true);

        $dayOne = isset($data['dayOne']) ? (is_array($data['dayOne']) ? json_encode($data['dayOne']) : $data['dayOne']) : null;
        $dayTwo = isset($data['dayTwo']) ? (is_array($data['dayTwo']) ? json_encode($data['dayTwo']) : $data['dayTwo']) : null;
        $dayThree = isset($data['dayThree']) ? (is_array($data['dayThree']) ? json_encode($data['dayThree']) : $data['dayThree']) : null;
        $dayFour = isset($data['dayFour']) ? (is_array($data['dayFour']) ? json_encode($data['dayFour']) : $data['dayFour']) : null;
        $dayFive = isset($data['dayFive']) ? (is_array($data['dayFive']) ? json_encode($data['dayFive']) : $data['dayFive']) : null;

        $activity = new Activity();

        $activity->setDay1($dayOne);
        $activity->setDay2($dayTwo);
        $activity->setDay3($dayThree);
        $activity->setDay4($dayFour);
        $activity->setDay5($dayFive);

        $entityManager->persist($activity);
        $entityManager->flush();

        $responseData = [
            'id' => $activity->getId(),
            'dayOne' => $activity->getDay1(),
            'dayTwo' => $activity->getDay2(),
            'dayThree' => $activity->getDay3(),
            'dayFour' => $activity->getDay4(),
            'dayFive' => $activity->getDay5(),
        ];

        return $this->json($responseData);
    }


    #[Route('/activities/{id}', name: 'activity_show', methods: ['GET'])]
    public function show(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $activity = $entityManager->getRepository(Activity::class)->find($id);

        if (!$activity) {

            return $this->json('No trip found for id ' . $id, 404);
        }

        $data =  [
            'id' => $activity->getId(),
            'dayOne' => $activity->getDay1(),
            'dayTwo' => $activity->getDay2(),
            'dayThree' => $activity->getDay3(),
            'dayFour' => $activity->getDay4(),
            'dayFive' => $activity->getDay5(),
        ];

        return $this->json($data);
    }

    #[Route('/activities/{id}', name: 'activity_update', methods: ['PUT', 'PATCH'], requirements: ['id' => '\d+'])]
    public function update(EntityManagerInterface $entityManager, Request $request, int $id): JsonResponse
    {
        $content = $request->getContent();
        $data = json_decode($content, true);

        $dayOne = $data['dayOne'] ?? null;
        $dayTwo = $data['dayTwo'] ?? null;
        $dayThree = $data['dayThree'] ?? null;
        $dayFour = $data['dayFour'] ?? null;
        $dayFive = $data['dayFive'] ?? null;

        $activity = $entityManager->getRepository(Activity::class)->find($id);

        if (!$activity) {
            return $this->json('No trip found for id ' . $id, 404);
        }

        $activity->setDay1(trim($dayOne));
        $activity->setDay2(trim($dayTwo));
        $activity->setDay3(trim($dayThree));
        $activity->setDay4(trim($dayFour));
        $activity->setDay5(trim($dayFive));


        $entityManager->persist($activity);
        $entityManager->flush();

        $data =  [
            'id' => $activity->getId(),
            'dayOne' => $activity->getDay1(),
            'dayTwo' => $activity->getDay2(),
            'dayThree' => $activity->getDay3(),
            'dayFour' => $activity->getDay4(),
            'dayFive' => $activity->getDay5(),
        ];
        return $this->json($data);
    }


    #[Route('/activities/{id}', name: 'activity_delete', methods: ['delete'])]
    public function delete(EntityManagerInterface $entityManager, int $id): JsonResponse
    {
        $activity = $entityManager->getRepository(Activity::class)->find($id);

        if (!$activity) {
            return $this->json('No trip found for id ' . $id, 404);
        }

        $entityManager->remove($activity);
        $entityManager->flush();

        return $this->json('Deleted a trip successfully with id ' . $id);
    }
}
