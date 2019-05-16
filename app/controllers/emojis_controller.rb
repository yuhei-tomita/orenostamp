class EmojisController < ApplicationController
  def new
  end

  def show
    @emojis = Emoji.all
  end

  def index
    @emojis = Emoji.all
  end

  def create
    @emoji = Emoji.new(permit_params)
    if @emoji.save
      redirect_to action: 'show'
    else
      render 'new'
    end
  end

  def search
    @emojis = Emoji.where('name LIKE(?)', "%#{params[:keyword]}%")
    respond_to do |format|
      format.json { render 'emoji', json: @emojis } #json形式のデータを受け取ったら、@usersをデータとして返すそしてindex をrenderで表示する
    end
  end

  private
    def permit_params
      params.require(:emoji).permit(:name, :image)
    end
end
