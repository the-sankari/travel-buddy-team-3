<?php

namespace App\Entity;

use App\Repository\ActivityRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ActivityRepository::class)]
class Activity
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $dayOne = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $dayTwo = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $dayThree = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $dayFour = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $dayFive = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDayOne(): ?string
    {
        return $this->dayOne;
    }

    public function setDayOne(?string $dayOne): static
    {
        $this->dayOne = $dayOne;

        return $this;
    }

    public function getDayTwo(): ?string
    {
        return $this->dayTwo;
    }

    public function setDayTwo(?string $dayTwo): static
    {
        $this->dayTwo = $dayTwo;

        return $this;
    }

    public function getDayThree(): ?string
    {
        return $this->dayThree;
    }

    public function setDayThree(?string $dayThree): static
    {
        $this->dayThree = $dayThree;

        return $this;
    }

    public function getDayFour(): ?string
    {
        return $this->dayFour;
    }

    public function setDayFour(?string $dayFour): static
    {
        $this->dayFour = $dayFour;

        return $this;
    }

    public function getDayFive(): ?string
    {
        return $this->dayFive;
    }

    public function setDayFive(?string $dayFive): static
    {
        $this->dayFive = $dayFive;

        return $this;
    }
}
