import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CollaboratorService } from './collaborator.service';
import { CreateCollaboratorDto } from './dto/create-collaborator.dto';
import { UpdateCollaboratorDto } from './dto/update-collaborator.dto';

@Controller('collaborator')
export class CollaboratorController {
  constructor(private readonly collaboratorService: CollaboratorService) {}

  @Post(':invitedBy')
  create(
    @Param('invitedBy') invitedBy: string,
    @Body() body: Omit<CreateCollaboratorDto, 'invitedBy'>,
  ) {
    return this.collaboratorService.create({ ...body, invitedBy });
  }

  @Get('/mycollab/:invitedById')
  findAll(@Param('invitedById') invitedById: string) {
    return this.collaboratorService.findAllByOwner(invitedById);
  }

  @Get('/mycollab/:invitedById/detail/:collabId')
  findOne(
    @Param('invitedById') invitedById: string,
    @Param('collabId') collabId: string,
  ) {
    return this.collaboratorService.findOne(collabId, invitedById);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollaboratorDto: UpdateCollaboratorDto,
  ) {
    return this.collaboratorService.update(id, updateCollaboratorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.collaboratorService.remove(+id);
  }
}
