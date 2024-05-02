import { PaginationParams } from '@/core/repositories/pagination-params'
import { QuestionsRepository } from '@/domain/forum/application/repositories/questions-repository'
import { Question } from '@/domain/forum/enterprise/entities/question'
import { PrismaService } from '@/infra/database/prisma/prisma.service'
import { Injectable } from '@nestjs/common'
import { PrismaQuestionMapper } from '../mappers/prisma-question-mapper'

@Injectable()
export class PrismaQuestionsRepository implements QuestionsRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        id,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findBySlug(slug: string): Promise<Question | null> {
    const question = await this.prisma.question.findUnique({
      where: {
        slug,
      },
    })

    if (!question) {
      return null
    }

    return PrismaQuestionMapper.toDomain(question)
  }

  async findManyRecent({ page }: PaginationParams): Promise<Question[]> {
    const questions = await this.prisma.question.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return questions.map(PrismaQuestionMapper.toDomain)
  }

  async create(question: Question): Promise<Question> {
    const data = PrismaQuestionMapper.toPersistent(question)

    const createdQuestion = await this.prisma.question.create({
      data,
    })

    return PrismaQuestionMapper.toDomain(createdQuestion)
  }

  async save(question: Question): Promise<Question> {
    const data = PrismaQuestionMapper.toPersistent(question)

    const updatedQuestion = await this.prisma.question.update({
      where: {
        id: data.id,
      },
      data,
    })

    return PrismaQuestionMapper.toDomain(updatedQuestion)
  }

  async delete(question: Question): Promise<void> {
    const data = PrismaQuestionMapper.toPersistent(question)

    await this.prisma.question.delete({
      where: {
        id: data.id,
      },
    })
  }
}
